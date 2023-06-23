package br.com.projetomaestro.model;
import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tb_pessoa")
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Pessoa implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long codigo;
	
	@Column(nullable = false)
	private String nome;
	
	private Date dataNascimentno;
	
	@Column(nullable = false)
	@Pattern(regexp = "[MF]",message = "O sexo deve ser M (masculino) ou F (feminino)")
	private String sexo;
	
	@ManyToOne
	@JoinColumn(name = "familiaCodigo")
	private Familia familia;
	
	@OneToOne(mappedBy = "pessoa")
	private Usuario usuario;
	
	@OneToOne(mappedBy = "pessoa")
	private Membro membro;
	
	private String cpf;
	
	private String rg;
	
	private String email;
	
	private String ddd;
	
	private String celular;
	
	private String endereco;
	
	private Integer num_endereco;
	
	private String complemento;
	
	private String bairro;
	
	private String cidade;
	
	private String uf;
	
	private Integer cep;
	
    public static boolean validarCpf(String cpf) {
        if (cpf.length() != 11) {
            return false;
        }

        int aux = cpf.charAt(0);
        boolean isEqual = true;

        for (int i = 1; i < cpf.length(); i++) {
            if (aux != cpf.charAt(i)) {
                isEqual = false;
                break;
            }
        }

        if (isEqual) {
            return false;
        }

        int peso = 10;
        int soma = 0;

        for (int i = 0; i < 9; i++) {
            soma += (cpf.charAt(i) - '0') * (peso);
            peso--;
        }

        soma = (soma * 10) % 11;
        int dig1 = (soma >= 10) ? 0 : soma;

        if (dig1 != cpf.charAt(9) - '0') {
            return false;
        }


        peso = 11;
        soma = 0;

        for (int i = 0; i < 10; i++) {
            soma += (cpf.charAt(i) - '0') * peso;
            peso--;
        }

        soma = (soma * 10) % 11;
        int dig2 = (soma >= 10) ? 0 : soma;

        if (dig2 != cpf.charAt(10) - '0') {
            return false;
        }

        return true;
    }

	
}
