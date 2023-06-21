package br.com.projetomaestro.entety;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
@Entity
@Table(name = "tb_pessoa")
public class Pessoa {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long codigo;
	
	@Column(nullable = false)
	private String nome;
	
	private Date dataNascimentno;
	
	@Column(nullable = false)
	@Pattern(regexp = "[MF]",message = "O sexo deve ser M (masculino) ou F (feminino)")
	private String sexo;
	
	private Integer cpf;
	
	private String rg;
	
	private String email;
	
	private Integer celular;
	
	private String endereco;
	
	private Integer num_endereco;
	
	private String complemento;
	
	private String bairro;
	
	private String cidade;
	
	private String uf;
	
	private Integer cep;
	
}
